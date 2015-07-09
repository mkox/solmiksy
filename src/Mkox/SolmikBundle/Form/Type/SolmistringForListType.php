<?php

namespace Mkox\SolmikBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Mkox\SolmikBundle\Utils;

/**
 * Defines the form used to create and manipulate solmistrings.
 */
class SolmistringForListType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
//var_dump($options);
//exit;
//var_dump($options['data']->getBaseScale());
//exit;
        $soundKeys =  Utils\Misc::getSoundKeys();
        $soundKeyOptions = array();
        foreach ($soundKeys as $value => $label) {
            $soundKeyOptions[$value] = $label;
        }
        
        $baseScaleOptions = array();
        for ($i = 1; $i <= 9; $i++) {
            $baseScaleOptions[$i] = $i;
        }
        
        $builder
            ->add('soundKey', 'choice', array('choices' => $soundKeyOptions, 'label' => false))
            ->add('baseScale', 'choice', array(
                'choices' => $baseScaleOptions,
                'label' => false
//                ,
//                'data' => $options['data']->getBaseScale()
                ))
            ->add('string', null, array('label' => false))
            ->add('save', 'submit', array('label' => 'Go'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Mkox\SolmikBundle\Entity\Solmistring',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'solmik_solmistring_for_list';
    }
}
